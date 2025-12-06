 import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const FilterDropdown = ({ value, onChange, options, label }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-[180px] bg-white text-foreground border-input hover:bg-accent hover:text-accent-foreground transition-colors">
      <SelectValue placeholder={label} />
    </SelectTrigger>
    <SelectContent className="bg-white text-foreground border-input">
      <SelectItem value="All" className="focus:bg-accent focus:text-accent-foreground cursor-pointer">
        {label}
      </SelectItem>
      {options.map((opt) => (
        <SelectItem 
          key={opt} 
          value={opt}
          className="focus:bg-accent focus:text-accent-foreground cursor-pointer"
        >
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);