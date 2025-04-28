import { useModelViewStore } from './store'

export default function UI() {
  const view = useModelViewStore((state) => state.view)
  const setView = useModelViewStore((state) => state.setView)
  const vertexCount = useModelViewStore((state) => state.vertexCount)
  const faceCount = useModelViewStore((state) => state.faceCount)
  const edgeCount = useModelViewStore((state) => state.edgeCount)

  return (
    <div style={{
      position: 'absolute',
      top: 10,
      left: 10,
      background: '#0009',
      padding: '10px',
      borderRadius: '8px',
      color: 'white',
      fontFamily: 'sans-serif',
      fontSize: '14px'
    }}>
      <div><strong>Vista:</strong></div>
      <button onClick={() => setView('wireframe')} style={{ margin: 2 }}>Wireframe</button>
      <button onClick={() => setView('edges')} style={{ margin: 2 }}>Edges</button>
      <button onClick={() => setView('points')} style={{ margin: 2 }}>Points</button>

      <div style={{ marginTop: 10 }}>
        <div><strong>Vértices:</strong> {vertexCount}</div>
        <div><strong>Caras:</strong> {faceCount}</div>
        <div><strong>Aristas:</strong> {edgeCount}</div>
      </div>
    </div>
  )
}
