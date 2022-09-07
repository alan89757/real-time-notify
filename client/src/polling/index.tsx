import React, { useEffect, useRef, useState } from 'react'

const fetchLatestEvents = async (timestamp) => {
  // 获取最新的事件
  const body = await fetch(`http://localhost:9090/events?timestamp=${timestamp}`)
  if (body.ok) {
    const json = await body.json()
    return json
  } else {
    console.error('failed to fetch')
  }
}

function App() {
  // 记录当前客户端拿到的最新事件的timestamp
  const timestampRef = useRef(0)
  const [events, setEvents] = useState([])
  
  useEffect(() => {
    const timer = setInterval(async () => {
      const latestEvents = await fetchLatestEvents(timestampRef.current)
      if (latestEvents && latestEvents.length) {
        timestampRef.current = latestEvents[latestEvents.length - 1].timestamp
        setEvents(events => [...events, ...latestEvents])
      }
    }, 3000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="App">
      <h2>event list</h2>
      <ol>
        {
          events.map(event => {
            return <li key={event.id}>{`${event.id}`}</li>
          })
        }
      </ol>
    </div>
  );
}

export default App