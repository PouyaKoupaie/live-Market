import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
type HomeCardProps = {
    title: string,
    description: string,
    imgSource:string
}
export function HomeCard({title , description, imgSource}: HomeCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30" />
      <img
        src={imgSource}
        alt="Event cover"
        className="relative z-20 w-full object-cover"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
