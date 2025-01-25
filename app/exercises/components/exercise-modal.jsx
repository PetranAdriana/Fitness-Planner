import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function ExerciseModal({ exercise, isOpen, onClose }) {
  if (!exercise) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold capitalize text-gray-900">
            {exercise.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Exercise GIF */}
          <div className="relative h-64 w-full rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={exercise.gifUrl}
              alt={exercise.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Exercise Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-indigo-600">Target</p>
                <p className="text-lg capitalize">{exercise.target}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-purple-600">Body Part</p>
                <p className="text-lg capitalize">{exercise.bodyPart}</p>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-pink-600">Equipment</p>
                <p className="text-lg capitalize">{exercise.equipment}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-600">
                  Secondary Muscles
                </p>
                <p className="text-sm capitalize">
                  {exercise.secondaryMuscles.join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Instructions
            </h3>
            <ol className="list-decimal list-inside space-y-2">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700 pl-2 leading-relaxed">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
