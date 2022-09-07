import React, { useEffect, useRef, useState } from 'react'

const fetchLatestEvents = async (timestamp) => {
  const body = await fetch(`http://localhost:8080/subscribe?timestamp=${timestamp}`)
  if (body.ok) {
    const json = await body.json()
    return json
  } else {
    console.error('failed to fetch')
  }
}

const listEvents = async () => {
  const body = await fetch(`http://localhost:8080/list`)
  if (body.ok) {
    const json = await body.json()
    return json
  } else {
    console.error('failed to fetch')
  }
}

function App() {
  const timestampRef = useRef(0)
  const eventsRef = useRef([])
  const [refresh, setRefresh] = useState(false)
  
  useEffect(() => {
    const fetchTask = async () => {
      if (timestampRef.current === 0) {
        // 初次加载
        const currentEvents = await listEvents()
        timestampRef.current = currentEvents[currentEvents.length - 1].timestamp
        eventsRef.current = [...eventsRef.current, ...currentEvents]
      }
  
      const latestEvents = await fetchLatestEvents(timestampRef.current)
      if (latestEvents && latestEvents.length) {
        timestampRef.current = latestEvents[latestEvents.length - 1].timestamp
        eventsRef.current = [...eventsRef.current, ...latestEvents]
      }
    }

    fetchTask()
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        // 触发下次加载
        setRefresh(refresh => !refresh)
      })
  }, [refresh])

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