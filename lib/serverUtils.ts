"use server";
import { createClerkSupabaseClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { MaintenanceItem, NewCarType } from "@/lib/zodSchemas";

export async function HandleAddNewCar(formData: NewCarType) {
  const { carImage } = formData;
  const carImageName = carImage?.at(0)?.name;
  const carImageFile = carImage?.at(0);
  const uploadedImageName = `${Math.random()}-${carImageName}`.replaceAll(
    "/",
    ""
  );
  const supabase = await createClerkSupabaseClient();

  // change the newcar carImage property to the uploaded image URL to be provided to the image element src attribute in carCard component
  formData.carImage = `https://rrdowjxummyrbbamenzq.supabase.co/storage/v1/object/public/car-images/${uploadedImageName}`;
  formData.Maintenance = [
    {
      name: "Brake Pads",
      class: "brake-pads",
      changeEvery: 30000,
      currentKilometrage: formData.currentKilometrage,
      historyLog: [],
    },
    {
      name: "Oil Change",
      class: "oil-change",
      changeEvery: 10000,
      currentKilometrage: formData.currentKilometrage,
      historyLog: [],
    },
    {
      name: "Tires",
      class: "tires",
      changeEvery: 50000,
      currentKilometrage: formData.currentKilometrage,
      historyLog: [],
    },
  ];
  console.log(formData);
  //Add the new car to the database
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
    .upload(`${uploadedImageName}`, carImageFile as File);

  if (imageStorageError) {
    console.error("Error uploading image:", imageStorageError.message);

    // delete the newly added car in case of image upload error

    const { error: deleteError } = await supabase
      .from("cars")
      .delete()
      .eq("carId", data.at(0).carId);
    if (deleteError)
      console.error(
        "error deleting the car after carImage upload failure",
        deleteError.message
      );
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
  const filteredMaintenanceItem = MaintenanceData.filter(
    //this is every Maintenance Item like Brake Pads  object etc...
    (item) => item.name === newMaintenance.name
  ).at(0);
  // remove name property from newMaintenance object
  const { name, ...Maintenanceitem } = newMaintenance;
  filteredMaintenanceItem.historyLog.push(Maintenanceitem);
  const finalData = MaintenanceData.map((item) =>
    item.name === filteredMaintenanceItem.name ? filteredMaintenanceItem : item
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

export async function deleteLastMaintenance(name: string, carId: string) {
  const supabase = await createClerkSupabaseClient();
  const { data: Maintenance } = await supabase
    .from("cars")
    .select("Maintenance");

  const MaintenanceItems: MaintenanceItem[] = Maintenance?.at(0).Maintenance;

  const filteredMaintenanceItem = MaintenanceItems.filter(
    //this is every Maintenance Item like Brake Pads  object etc...
    (item: MaintenanceItem) => item.name === name
  ).at(0);
  // remove the last item from the historyLog array
  if (filteredMaintenanceItem.historyLog.length === 0)
    throw new Error("No Maintenance History to delete");
  filteredMaintenanceItem.historyLog.pop();
  const finalData = MaintenanceItems.map((item: MaintenanceItem) =>
    item.name === filteredMaintenanceItem.name
      ? {
          ...filteredMaintenanceItem,
          historyLog: [...filteredMaintenanceItem.historyLog],
        }
      : item
  );

  const { data, error } = await supabase
    .from("cars")
    .update({
      Maintenance: finalData,
    })
    .eq("carId", carId)
    .select();

  if (error) {
    console.error("Error deleting last maintenance", error.message);
    throw new Error("Error deleting last maintenance");
  } else {
    revalidatePath("/cars/" + data.at(0).carId);
  }
}

export async function editLastMaintenance(
  carId: string,
  newMaintenance: {
    name: string;
    date: string;
    brand: string;
    price: string;
    kilometrageBeforeMaintenance: number;
    kilometrageNextMaintenance: number;
  }
) {
  await deleteLastMaintenance(newMaintenance.name, carId);
  await addNewMaintenance({ newMaintenance, carId });
}

export async function updateChangeEvery(
  name: string,
  carId: string,
  newChangeEveryValue: number
) {
  const supabase = await createClerkSupabaseClient();
  const { data: Maintenance } = await supabase
    .from("cars")
    .select("Maintenance");

  const MaintenanceItems: MaintenanceItem[] = Maintenance?.at(0).Maintenance;

  const filteredMaintenanceItem = MaintenanceItems.filter(
    //this is every Maintenance Item like Brake Pads  object etc...
    (item: MaintenanceItem) => item.name === name
  ).at(0);
  //update the changeEvery value of the filteredMaintenanceItem
  const finalData = MaintenanceItems.map((item: MaintenanceItem) =>
    item.name === filteredMaintenanceItem.name
      ? {
          ...filteredMaintenanceItem,
          changeEvery: newChangeEveryValue,
        }
      : item
  );
  const { data, error } = await supabase
    .from("cars")
    .update({
      Maintenance: finalData,
    })
    .eq("carId", carId)
    .select();

  if (error) {
    console.error(
      `Error updating changeEvery value for ${name} maintenance`,
      error.message
    );
    throw new Error(`Error updating changeEvery value for ${name} maintenance`);
  } else {
    revalidatePath("/cars/" + data.at(0).carId);
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
export async function getLatestMaintenance(
  carId: string,
  maintenanceName: string
) {
  const supabase = await createClerkSupabaseClient();
  const { data: Maintenance } = await supabase
    .from("cars")
    .select("Maintenance")
    .eq("carId", carId);

  const MaintenanceItems: MaintenanceItem[] = Maintenance?.at(0).Maintenance;

  const filteredMaintenanceItem = MaintenanceItems.filter(
    (item: MaintenanceItem) => item.name === maintenanceName
  ).at(0);

  if (
    !filteredMaintenanceItem ||
    filteredMaintenanceItem.historyLog.length === 0
  )
    return null;

  const latestMaintenance = filteredMaintenanceItem.historyLog.at(-1);

  return latestMaintenance;
}
