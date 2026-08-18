const MotivationQuotes = () => {
  const quotes = [
    {
      text: "“Discipline is choosing between what you want now and what you want most.”",
      author: "Abraham Lincoln",
      bg: "bg-primary-50",
      textCol: "text-primary-900",
      iconCol: "text-primary-400"
    },
    {
      text: "“The secret of your future is hidden in your daily routine.”",
      author: "Mike Murdock",
      bg: "bg-blue-50",
      textCol: "text-blue-900",
      iconCol: "text-blue-400"
    },
    {
      text: "“Small consistent efforts every day lead to big results.”",
      author: "Unknown",
      bg: "bg-orange-50",
      textCol: "text-orange-900",
      iconCol: "text-orange-400"
    }
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      <h3 className="text-lg font-bold text-gray-800">Daily Motivation</h3>
      <div className="flex flex-col gap-4">
        {quotes.map((q, i) => (
          <div key={i} className={`${q.bg} p-6 rounded-2xl border border-white border-opacity-50 shadow-sm`}>
            <div className={`text-4xl font-serif leading-none mb-2 ${q.iconCol}`}>“</div>
            <p className={`font-medium mb-4 leading-relaxed ${q.textCol}`}>
              {q.text.replace(/“|”/g, '')}
            </p>
            <p className={`text-sm font-semibold opacity-70 ${q.textCol}`}>— {q.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotivationQuotes;
