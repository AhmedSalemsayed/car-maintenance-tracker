"use server";
import { createClerkSupabaseClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NewCarType } from "@/lib/zodSchemas";

export async function HandleAddNewCar(formData: NewCarType) {
  const { carImage } = formData;
  const carImageName = carImage?.at(0)?.name;
  const uploadedImageName = `${Math.random()}-${carImageName}`.replaceAll(
    "/",
    ""
  );
  const supabase = await createClerkSupabaseClient();

  // change the newcar carImage property to the uploaded image URL to be provided to the image element src attribute in carCard component
  formData.carImage = `https://rrdowjxummyrbbamenzq.supabase.co/storage/v1/object/public/car-images/${uploadedImageName}`;

  // Add the new car to the database
  const { data, error } = await supabase
    .from("cars")
    .insert([formData])
    .select();

  if (error) {
    console.error("Error adding car", error.message);
    return;
  } else {
    console.log("Car added successfully:");
    console.log(data);
  }

  //upload car image to supabase storage bucket

  const { error: imageStorageError } = await supabase.storage
    .from("car-images")
    .upload(`${uploadedImageName}`, carImage.at(0) as File);

  if (imageStorageError) {
    console.error("Error uploading image:", imageStorageError.message);
    // delete the newly added car

    const { error: deleteError } = await supabase
      .from("cars")
      .delete()
      .eq("carId", data.at(0).carId);
    if (deleteError)
      console.error("error deleting the car", deleteError.message);
  } else {
    console.log("Car image uploaded successfully");
  }

  revalidatePath("/cars");
  return data;
}

export async function deleteCar(carId: number, imageName: string) {
  const supabase = await createClerkSupabaseClient();
  const { error: deleteError } = await supabase
    .from("cars")
    .delete()
    .eq("carId", carId);

  const { data, error } = await supabase.storage
    .from("car-images")
    .remove([`${imageName}`]);

  if (deleteError) console.error("error deleting the car", deleteError.message);
  revalidatePath("/cars");
}

export async function addNewMaintenance({
  newMaintenance,
  carId,
}: {
  newMaintenance: {
    name: string;
    date: string;
    brand: string;
    price: string;
    kilometrageBeforeMaintenance: number;
    kilometrageNextMaintenance: number;
  };
  carId: string;
}) {
  const supabase = await createClerkSupabaseClient();

  const { data: Maintenance } = await supabase
    .from("cars")
    .select("Maintenance");
  const MaintenanceData = Maintenance?.at(0).Maintenance;
  const filteredMaintenanceData = MaintenanceData.filter(
    //this is every Maintenance Item like Brake Pads  object etc...
    (item) => item.name === newMaintenance.name
  ).at(0);
  // remove name property from newMaintenance object
  const { name, ...Maintenanceitem } = newMaintenance;
  filteredMaintenanceData.historyLog.push(Maintenanceitem);
  const finalData = MaintenanceData.map((item) =>
    item.name === filteredMaintenanceData.name ? filteredMaintenanceData : item
  );
  const { data, error } = await supabase
    .from("cars")
    .update({
      Maintenance: finalData,
    })
    .eq("carId", carId)
    .select();

  if (error) {
    console.error("Error adding new maintenance", error.message);
  } else {
    revalidatePath("/cars/" + carId);
  }
}

export async function updateKiloMetrage(newKilometrage: number, carId: string) {
  const supabase = await createClerkSupabaseClient();
  const { data, error } = await supabase
    .from("cars")
    .update({
      currentKilometrage: newKilometrage,
    })
    .eq("carId", carId)
    .select();

  if (error) {
    console.error("Error adding new maintenance", error.message);
  } else {
    revalidatePath("/cars/" + carId);
  }
}
