import React from 'react';
import { Wrench, Home, Car, Zap } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  icon: typeof Wrench | typeof Home | typeof Car | typeof Zap;
  color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className={`${color} p-6 flex justify-center`}>
        <Icon className="w-12 h-12 text-white" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 text-center">{title}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;