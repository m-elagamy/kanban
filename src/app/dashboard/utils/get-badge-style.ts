const getBadgeStyle = (priority: string) => {
  const classes = {
    high: "bg-linear-to-r from-red-500 to-orange-600 text-white",
    medium: "bg-linear-to-r from-amber-400 to-yellow-500 text-black",
    low: "bg-linear-to-r from-green-600 to-teal-500 text-white",
  };
  return classes[priority as keyof typeof classes] || "bg-gray-300";
};

export default getBadgeStyle;
