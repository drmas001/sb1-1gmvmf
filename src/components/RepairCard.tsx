import React from 'react';
import { Clock, BarChart } from 'lucide-react';

interface RepairCardProps {
  id: number;
  title: string;
  difficulty: string;
  time: string;
  image: string;
}

const RepairCard: React.FC<RepairCardProps> = ({
  title,
  difficulty,
  time,
  image
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <BarChart className="h-4 w-4 mr-1" />
            <span>{difficulty}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairCard;