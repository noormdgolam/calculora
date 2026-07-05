import { useState } from 'react';

const WordCounter = () => {
  const [text, setText] = useState('');

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCountWithSpaces = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;
  const paragraphCount = text.trim() === '' ? 0 : text.replace(/\n$/gm, '').split(/\n/).length;
  
  // Average reading speed is roughly 225 words per minute
  const readingTimeMinutes = Math.ceil(wordCount / 225);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="mb-2">Word & Character Counter</h1>
        <p>Instantly count words, characters, and estimate reading time for your text.</p>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>
        
        <div className="flex justify-between gap-4 mb-6" style={{ flexWrap: 'wrap' }}>
          <div className="p-4 flex-1 text-center" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)', lineHeight: 1 }}>{wordCount}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Words</div>
          </div>
          <div className="p-4 flex-1 text-center" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-secondary)', lineHeight: 1 }}>{charCountWithSpaces}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Characters</div>
          </div>
          <div className="p-4 flex-1 text-center" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', lineHeight: 1 }}>{paragraphCount}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Paragraphs</div>
          </div>
          <div className="p-4 flex-1 text-center" style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8b5cf6', lineHeight: 1 }}>{readingTimeMinutes}m</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Reading Time</div>
          </div>
        </div>

        <textarea 
          className="input-field" 
          rows={12} 
          placeholder="Paste or type your text here..." 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          style={{ resize: 'vertical' }}
        ></textarea>

        <div className="mt-4 flex justify-between" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <span>Characters (no spaces): {charCountNoSpaces}</span>
          <button 
            type="button" 
            onClick={() => setText('')} 
            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
          >Clear Text</button>
        </div>

      </div>

      <article className="content-section">
        <h2>Why Use an Online Word Counter?</h2>
        <p>
          Whether you are a student writing an essay, a freelance writer working on an assignment, or a marketer drafting a social media post, adhering to specific length requirements is a daily necessity. Our Word Counter is a free, lightning-fast tool that analyzes your text in real-time, directly in your browser. Because the counting happens locally on your machine, your text is completely secure and is never uploaded to any external servers.
        </p>

        <h3 className="mt-6 mb-2">Word Limits vs. Character Limits</h3>
        <p>
          Different platforms have entirely different requirements for text length, making a dual word-and-character counter essential. 
        </p>
        <p>
          <strong>Word limits</strong> are generally used in academia and publishing. An essay prompt might demand a 1,000-word submission, or a blog post might be optimized for SEO at 1,500 words. 
        </p>
        <p>
          <strong>Character limits</strong> are strictly enforced by software platforms and social media networks. For example, a standard SMS text message is limited to 160 characters. A tweet on X (formerly Twitter) is limited to 280 characters for standard users. Google Search results typically cut off meta descriptions around 155 to 160 characters. Knowing exactly how many characters you have typed—with and without spaces—ensures your message won't be abruptly cut off.
        </p>

        <h3 className="mt-6 mb-2">The Importance of Estimated Reading Time</h3>
        <p>
          In the age of short attention spans, knowing how long it will take an audience to read your content is incredibly valuable. Our tool calculates the estimated reading time based on a universally accepted average reading speed of 225 words per minute. 
        </p>
        <p>
          If you are writing a speech for a wedding or a corporate presentation, you can paste your script into our counter to immediately know if you will go over your allotted time slot. Similarly, modern blogs often display estimated reading times at the top of articles to set expectations for the reader, which has been shown to decrease bounce rates and increase engagement.
        </p>

        <h3 className="mt-6 mb-2">SEO and Word Counts</h3>
        <p>
          If you are writing content for the web, word count directly impacts Search Engine Optimization (SEO). While Google insists that word count is not a direct ranking factor, extensive industry studies show a strong correlation between long-form, comprehensive content (typically 1,000 to 2,000+ words) and higher search engine rankings. A word counter helps you ensure you have written enough in-depth content to comprehensively answer a searcher's query, giving you the best chance to rank on the first page.
        </p>
      </article>
    </div>
  );
};

export default WordCounter;
