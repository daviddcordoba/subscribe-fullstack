import SubscribeForm from "./components/ux/SubscribeForm"



function App() {
  

  return (
    
      <div  className="bg-black">
        
        <main className="flex flex-col items-center justify-center min-h-screen  text-white">
          <SubscribeForm/>
        </main>
        
        <footer className=" py-4 mt-8">
          <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
            {/* Copyright */}
            <p className="text-sm text-gray-600">
              © 2025 Subscribe Form. All Rights Reserved.
            </p>
            
            {/* Design credit */}
            <p className="text-sm text-gray-600">
              Design by <span className="font-bold text-gray-800">EquipoDotGuru</span>.
            </p>
          </div>
        </footer>

      </div>
        
  )
}

export default App
