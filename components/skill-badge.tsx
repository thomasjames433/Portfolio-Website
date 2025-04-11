interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-800 font-medium">
      {name}
    </div>
  )
}
