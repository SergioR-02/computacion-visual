import { create } from 'zustand'

export const useModelViewStore = create((set) => ({
  view: 'edges',
  vertexCount: 0,
  faceCount: 0,
  edgeCount: 0,
  setView: (view) => set({ view }),
  setVertexCount: (count) => set({ vertexCount: count }),
  setFaceCount: (count) => set({ faceCount: count }),
  setEdgeCount: (count) => set({ edgeCount: count }),
}))
