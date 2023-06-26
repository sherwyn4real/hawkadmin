import React from 'react'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout({
    children, 
    
  }) {
    return (
      <Sidebar>
        {children}
      </Sidebar>
    );
  }





// const layout = () => {
//   return (
//     <Sidebar/>
//   )
// }

// export default layout