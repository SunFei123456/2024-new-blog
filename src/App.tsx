import { useState } from 'react'
import React from 'react';

// 导入layout布局组件
// import Layout from '@/layout/index'
import { Outlet } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App
