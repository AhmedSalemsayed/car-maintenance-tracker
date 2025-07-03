"use client";
import { useMediaQuery } from "usehooks-ts";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AddNewCarForm from "./AddNewCarForm";
import { useState } from "react";

export default function AddNewCar() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="text-md">
            <Plus />
            <span>Add A New Car</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add A New Car</DialogTitle>
            <DialogDescription>
              Add Car Details here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <AddNewCarForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <Plus />
          <span>Add A New Car</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add A New Car</DrawerTitle>
          <DrawerDescription>
            Add Car Details here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <AddNewCarForm setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// interface AddNewCarFormProps extends React.ComponentProps<"form"> {
//   className?: string;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

//   return (
//     <form
//       className={cn("grid items-start gap-4 overflow-auto", className)}
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <div className="grid gap-2">
//         <Label htmlFor="chassisNumber">Chassis Number</Label>
//         <Input
//           {...register("chassisNumber")}
//           type="text"
//           name="chassisNumber"
//           id="chassisNumber"
//           placeholder="Your Car Chassis Number"
//         />
//       </div>
//       <ErrorMessage
//         errors={errors}
//         name="chassisNumber"
//         render={({ message }) => (
//           <p className="text-red-500 text-sm">{message}</p>
//         )}
//       />

//       <div className="grid gap-2">
//         <Label htmlFor="brand">Brand</Label>
//         <Input
//           {...register("brand")}
//           type="text"
//           name="brand"
//           id="brand"
//           placeholder="Your Car Brand"
//         />
//         {
//           <datalist id="brand">
//             {carBrands.map((brand) => (
//               <option value={brand} key={brand} />
//             ))}
//           </datalist>
//         }
//       </div>

//       <ErrorMessage
//         errors={errors}
//         name="brand"
//         render={({ message }) => (
//           <p className="text-red-500 text-sm">{message}</p>
//         )}
//       />
//       <div className="grid gap-2">
//         <Label htmlFor="model">Model</Label>
//         <Input
//           {...register("model")}
//           type="text"
//           name="model"
//           id="model"
//           placeholder="Your Car Model"
//         />
//       </div>
//       <ErrorMessage
//         errors={errors}
//         name="model"
//         render={({ message }) => (
//           <p className="text-red-500 text-sm">{message}</p>
//         )}
//       />
//       <div className="grid gap-2">
//         <Label htmlFor="year">Year of Manufacture</Label>
//         <Input
//           {...register("year")}
//           type="text"
//           name="year"
//           id="year"
//           placeholder="Your Car Model"
//         />
//       </div>
//       <ErrorMessage
//         errors={errors}
//         name="year"
//         render={({ message }) => (
//           <p className="text-red-500 text-sm">{message}</p>
//         )}
//       />
//       <div className="grid gap-2">
//         <Label htmlFor="color">Color</Label>
//         <Input
//           {...register("color")}
//           type="text"
//           name="color"
//           id="color"
//           placeholder="Your Car Color"
//         />
//       </div>
//       <ErrorMessage
//         errors={errors}
//         name="color"
//         render={({ message }) => (
//           <p className="text-red-500 text-sm">{message}</p>
//         )}
//       />
//       <div className="grid gap-2">
//         <Label htmlFor="carImage">Upload Car Image</Label>
//         <Input
//           {...register("carImage")}
//           type="file"
//           name="carImage"
//           id="carImage"
//           className="file:mr-4 file:py-1 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#E9E1ff] file:text-[#7949ff] hover:file:bg-[#7949ff] hover:file:text-white transition-colors duration-300"
//         />
//       </div>
//       <ErrorMessage
//         errors={errors}
//         name="carImage"
//         render={({ message }) => (
//           <p className="text-red-500 text-sm">{message}</p>
//         )}
//       />
//       <SubmitButton isSubmitting={isSubmitting} />
//     </form>
//   );
// }
