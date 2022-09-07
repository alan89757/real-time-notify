import React, { useEffect, useRef, useState } from 'react'

function App() {
  const timestampRef = useRef(0)
  const eventsRef = useRef([])
  const [, setRefresh] = useState(false)
  
  useEffect(() => {
    const source = new EventSource(`http://localhost:8080/subscribe?timestamp=${timestampRef.current}`)
    
    source.onopen = () => {
      console.log('connected')
    }
    
    source.onmessage = event => {
      const latestEvents = JSON.parse(event.data)
      if (latestEvents.length) {
        timestampRef.current = latestEvents[latestEvents.length - 1].timestamp
        eventsRef.current = [...eventsRef.current, ...latestEvents]
        setRefresh(refresh => !refresh)
      }
    }
    
    source.addEventListener('error', (e) => {
      console.error('Error: ',  e);
    })

    return () => {
      source.close()
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