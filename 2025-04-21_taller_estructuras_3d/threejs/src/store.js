import { create } from 'zustand'

export const useModelViewStore = create((set) => ({
  view: 'edges',
  vertexCount: 0,
  setView: (view) => set({ view }),
  setVertexCount: (count) => set({ vertexCount: count }),
}))
