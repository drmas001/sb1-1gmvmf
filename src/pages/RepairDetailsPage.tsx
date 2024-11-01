import React from 'react';
import { useParams } from 'react-router-dom';
import { Wrench, Clock, BarChart, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useWikiArticle } from '../hooks/useWikiArticles';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const RepairDetailsPage = () => {
  const { id } = useParams();
  const { article, loading, error } = useWikiArticle(Number(id));

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load repair guide" />;
  if (!article) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
        <img
          src={article.images?.[0] || 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800'}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-4xl font-bold text-white mb-4">{article.title}</h1>
          <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-1">
              <BarChart className="h-5 w-5" />
              <span>{article.quality || 'Intermediate'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-5 w-5" />
              <span>{`${Math.floor(Math.random() * 30 + 15)} mins`}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{article.intro}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Step by Step Guide</h2>
            <div className="space-y-8">
              {article.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    {step.images?.[0] && (
                      <img
                        src={step.images[0]}
                        alt={step.title}
                        className="rounded-lg w-full"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-gray-600" />
              Required Tools
            </h2>
            <ul className="space-y-3">
              {article.steps.reduce((tools: string[], step) => {
                const stepTools = step.description
                  .match(/need|require|use|with \w+/gi)
                  ?.map(match => match.replace(/need|require|use|with /gi, ''))
                  .filter(Boolean) || [];
                return [...new Set([...tools, ...stepTools])];
              }, []).map((tool, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{tool}</span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    Essential
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Safety Tips
            </h2>
            <ul className="space-y-3">
              {article.warnings?.map((warning, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairDetailsPage;