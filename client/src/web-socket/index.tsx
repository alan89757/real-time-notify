import React, { useEffect, useRef, useState } from 'react'

function App() {
  const timestampRef = useRef(0)
  const eventsRef = useRef([])
  const [_, setRefresh] = useState(false)
  
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/ws?timestamp=${timestampRef.current}`)
    
    ws.addEventListener('open', e => {
      console.log('successfully connected')
    })
    
    ws.addEventListener('close', e => {
      console.log('socket close')
    })
    
    ws.addEventListener('message', (ev) => {
      const latestEvents = JSON.parse(ev.data)
      if (latestEvents && latestEvents.length) {
        timestampRef.current = latestEvents[latestEvents.length - 1].timestamp
        eventsRef.current = [...eventsRef.current, ...latestEvents]
        setRefresh(refresh => !refresh)
      }
    })
    
    return () => {
      ws.close()
    }
  }, [])

  return (
    <div className="App">
      <h2>event list</h2>
      <ol>
        {
          eventsRef.current.map(event => {
            return <li key={event.id}>{`${event.id}`}</li>
          })
        }
      </ol>
    </div>
  );
}

export default App