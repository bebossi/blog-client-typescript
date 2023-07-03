
function Footer() {
  return (
    <footer className="bg-gray-800 flex-shrink-0 ">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-center text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
