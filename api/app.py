from flask import Flask, jsonify, request
from flask_cors import CORS
import whapi
from typing import List, Dict, Any
import traceback
import time

app = Flask(__name__)
CORS(app)

def safe_get_images(article_id: int) -> List[str]:
    try:
        images = whapi.get_images(article_id)
        return [img for img in images if img.startswith('https://')][:3]  # Limit to 3 images
    except Exception:
        return []

def safe_get_intro(article_id: int) -> str:
    try:
        return whapi.parse_intro(article_id)
    except Exception:
        return ""

def safe_get_steps(article_id: int) -> List[Dict[str, Any]]:
    try:
        steps = whapi.parse_steps(article_id)
        return [
            {
                'number': i + 1,
                'title': step.get('summary', ''),
                'description': step.get('description', ''),
                'images': []
            }
            for i, step in enumerate(steps)
        ]
    except Exception:
        return []

@app.route('/api/articles/random')
def get_random_articles():
    try:
        count = min(int(request.args.get('count', 3)), 5)  # Limit to 5 articles max
        articles = []
        
        while len(articles) < count:
            try:
                article_id = whapi.random_article()
                details = whapi.return_details(article_id)
                
                if not details:
                    continue
                
                images = safe_get_images(article_id)
                if not images:
                    continue
                    
                article = {
                    'id': article_id,
                    'title': details.get('title', ''),
                    'quality': 'Featured' if details.get('quality') else 'Standard',
                    'intro': safe_get_intro(article_id),
                    'images': images[:1]  # Only use first image
                }
                articles.append(article)
                time.sleep(0.2)  # Reduced rate limiting
            except Exception:
                continue
        
        return jsonify(articles)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/articles/search')
def search_articles():
    try:
        query = request.args.get('q', '')
        if not query:
            return jsonify([])
            
        results = whapi.search(query, max_results=5)  # Limit to 5 results
        articles = []
        
        for result in results:
            try:
                article_id = result['id']
                images = safe_get_images(article_id)
                if not images:
                    continue
                    
                articles.append({
                    'id': article_id,
                    'title': result['title'],
                    'quality': 'Standard',
                    'images': images[:1]  # Only use first image
                })
                time.sleep(0.2)  # Reduced rate limiting
            except Exception:
                continue
        
        return jsonify(articles)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/articles/<int:article_id>')
def get_article(article_id):
    try:
        details = whapi.return_details(article_id)
        if not details:
            return jsonify({'error': 'Article not found'}), 404
            
        article = {
            'id': article_id,
            'title': details.get('title', ''),
            'quality': 'Featured' if details.get('quality') else 'Standard',
            'intro': safe_get_intro(article_id),
            'images': safe_get_images(article_id),
            'steps': safe_get_steps(article_id),
            'warnings': [
                'Always follow safety guidelines',
                'Read all instructions carefully before starting',
                'Use appropriate safety equipment'
            ]
        }
        
        return jsonify(article)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)