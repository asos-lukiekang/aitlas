export default function ReactionTimePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Reaction Time Game
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Test how quickly you can react to visual changes. Click as fast as you can when the screen turns green!
        </p>
        
        {/* Game area placeholder */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Game will be implemented here</p>
          </div>
        </div>
        
        {/* Basic controls placeholder */}
        <div className="space-y-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Start Game
          </button>
          <p className="text-sm text-gray-500">
            Average human reaction time is 200-300ms
          </p>
        </div>
      </div>
    </div>
  )
}