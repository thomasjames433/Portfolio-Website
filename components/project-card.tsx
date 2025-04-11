import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  githubLink: string
  demoLink?: string
  image: string
  featured?: boolean
}

export default function ProjectCard({
  title,
  description,
  tags,
  githubLink,
  demoLink,
  image,
  featured = false,
}: ProjectCardProps) {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${featured ? "border-blue-500 border-2" : ""}`}
    >
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{title}</h3>
          {featured && (
            <Badge variant="default" className="bg-blue-600">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-start gap-3 pt-0">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <Github className="mr-1 h-4 w-4" />
          GitHub
        </a>
        {demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="mr-1 h-4 w-4" />
            Live Demo
          </a>
        )}
      </CardFooter>
    </Card>
  )
}
