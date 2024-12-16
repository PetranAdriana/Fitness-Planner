import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import Image from "next/image";

export default function ExercisesList({ exercises }) {
  if (!exercises) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {exercises.map((exercise) => (
        <Card
          key={exercise.id}
          className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <CardHeader className="space-y-2 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-primary">
                {exercise.name}
              </CardTitle>
              <Badge variant="secondary" className="text-xs">
                {exercise.bodyPart}
              </Badge>
            </div>
            <CardDescription className="text-sm text-muted-foreground">
              Target: {exercise.target}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={exercise.gifUrl}
                alt={exercise.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Equipment: {exercise.equipment}
                </Badge>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Secondary Muscles:</h3>
                <div className="flex flex-wrap gap-2">
                  {exercise.secondaryMuscles.map((muscle) => (
                    <Badge key={muscle} variant="secondary" className="text-xs">
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Instructions:</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {exercise.instructions.map((instruction, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-4">
            <div className="w-full flex justify-end">
              <Badge className="text-xs" variant="default">
                ID: {exercise.id}
              </Badge>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
