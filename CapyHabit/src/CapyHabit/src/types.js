export interface Habit {
  id: number
  name: string
  checks: Record<string, boolean>
}

export interface Day {
  date: number
  dayName: string
  fullDate: string
}

export interface Note {
  id: number
  text: string
  completed: boolean
  reminderTime?: string
  createdAt: string
}
