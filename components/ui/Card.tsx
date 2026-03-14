import type { CardProps } from './types';

export function Card({
  title,
  description,
  icon,
  gradient = 'from-eco-light to-eco-sage',
  className = '',
  onClick
}: CardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}></div>
      <div className="relative z-10 p-8 text-white">
        {icon && (
          <div className="text-6xl mb-4">{icon}</div>
        )}
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="opacity-90">{description}</p>
      </div>
    </div>
  );
}
