export default function SchedulePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">This Week's Schedule</h1>

      <div className="bg-black rounded-lg p-6 border border-teal-500/20">
        <div className="grid grid-cols-7 gap-4 mb-4">
          <div className="text-center font-medium">Monday</div>
          <div className="text-center font-medium">Tuesday</div>
          <div className="text-center font-medium">Wednesday</div>
          <div className="text-center font-medium">Thursday</div>
          <div className="text-center font-medium">Friday</div>
          <div className="text-center font-medium">Saturday</div>
          <div className="text-center font-medium">Sunday</div>
        </div>

        <div className="grid grid-cols-7 gap-4 h-96">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="bg-black/50 rounded p-2 h-full overflow-y-auto border border-teal-500/10">
              {index === 0 && (
                <>
                  <div className="bg-teal-500/20 rounded p-2 mb-2 border border-teal-500/30">
                    <p className="font-medium">9:00 AM - 11:00 AM</p>
                    <p className="text-sm">Full Sleeve Design</p>
                    <p className="text-xs text-gray-300">Client: John Doe</p>
                  </div>
                  <div className="bg-teal-500/20 rounded p-2 mb-2 border border-teal-500/30">
                    <p className="font-medium">1:00 PM - 3:00 PM</p>
                    <p className="text-sm">Back Piece Session</p>
                    <p className="text-xs text-gray-300">Client: Jane Smith</p>
                  </div>
                </>
              )}

              {index === 2 && (
                <div className="bg-teal-500/20 rounded p-2 mb-2 border border-teal-500/30">
                  <p className="font-medium">2:00 PM - 4:00 PM</p>
                  <p className="text-sm">Consultation</p>
                  <p className="text-xs text-gray-300">Client: Mike Johnson</p>
                </div>
              )}

              {index === 4 && (
                <>
                  <div className="bg-teal-500/20 rounded p-2 mb-2 border border-teal-500/30">
                    <p className="font-medium">10:00 AM - 12:00 PM</p>
                    <p className="text-sm">Touch-up Session</p>
                    <p className="text-xs text-gray-300">Client: Sarah Williams</p>
                  </div>
                  <div className="bg-teal-500/20 rounded p-2 border border-teal-500/30">
                    <p className="font-medium">3:00 PM - 5:00 PM</p>
                    <p className="text-sm">Small Tattoo</p>
                    <p className="text-xs text-gray-300">Client: Alex Brown</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button className="bg-teal-500 hover:bg-teal-600 text-black px-4 py-2 rounded">Previous Week</button>
        <button className="bg-teal-500 hover:bg-teal-600 text-black px-4 py-2 rounded">Next Week</button>
      </div>
    </div>
  )
}
