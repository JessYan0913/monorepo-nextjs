import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SystemType = 'online' | 'offline' | 'default'

interface SystemState {
  systemType: SystemType
  setSystemType: (type: SystemType) => void
}

export const useSystemStore = create<SystemState>()(
  persist(
    (set) => ({
      systemType: 'default',
      setSystemType: (type) => set({ systemType: type }),
    }),
    {
      name: 'system-storage', // localStorage 中的键名
    }
  )
)
