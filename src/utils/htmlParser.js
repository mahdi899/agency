// Utility to parse HTML callouts back to callout objects
export const parseHtmlCallouts = (data) => {
  if (!data) {
    return [];
  }

  // If it's already an array (JSON format from database)
  if (Array.isArray(data)) {
    return data.map((item, index) => {
      let type = 'emerald';
      
      // Map different block types to callout types
      if (item.type === 'callout') {
        type = item.callout_type === 'warning' ? 'yellow' : 
               item.callout_type === 'error' ? 'red' : 
               item.callout_type === 'success' ? 'green' : 
               item.callout_type === 'info' ? 'blue' : 'emerald';
      } else if (item.type === 'quote') {
        type = 'blue'; // Quotes use blue
      } else if (item.type === 'list') {
        type = 'green'; // Lists use green
      } else if (item.type === 'cta') {
        type = 'purple'; // CTA uses purple
      }
      
      return {
        id: item.id || Date.now() + index,
        type,
        title: item.title || '',
        content: item.content || '',
        originalType: item.type, // Keep original type for reference
        originalData: item // Keep all original data
      };
    });
  }

  // If it's a string (HTML format)
  if (typeof data === 'string' && data.trim()) {
    try {
      // Try to parse as JSON first
      const jsonData = JSON.parse(data);
      if (Array.isArray(jsonData)) {
        return jsonData.map((item, index) => ({
          id: item.id || Date.now() + index,
          type: item.type || 'emerald',
          title: item.title || '',
          content: item.content || ''
        }));
      }
    } catch (e) {
      // If not JSON, parse as HTML
      const callouts = [];
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;
      
      // Find all callout containers
      const calloutElements = tempDiv.querySelectorAll('[class*="bg-"][class*="/10"]');
      
      calloutElements.forEach((element, index) => {
        const classList = element.className;
        let type = 'emerald'; // default
        
        // Extract type from class names
        if (classList.includes('bg-blue-500')) type = 'blue';
        else if (classList.includes('bg-yellow-500')) type = 'yellow';
        else if (classList.includes('bg-red-500')) type = 'red';
        else if (classList.includes('bg-green-500')) type = 'green';
        else if (classList.includes('bg-emerald-500')) type = 'emerald';
        else if (classList.includes('bg-purple-500')) type = 'purple';
        else if (classList.includes('bg-orange-500')) type = 'orange';
        else if (classList.includes('bg-pink-500')) type = 'pink';

        // Extract title and content
        const titleElement = element.querySelector('h4');
        const title = titleElement ? titleElement.textContent.trim() : '';
        
        const contentElement = element.querySelector('div[class*="text-dark-300"], p[class*="text-dark-300"]');
        const content = contentElement ? contentElement.textContent.trim() : '';

        // Only add if we have content
        if (title || content) {
          callouts.push({
            id: Date.now() + index,
            type,
            title,
            content
          });
        }
      });

      return callouts;
    }
  }

  return [];
};
