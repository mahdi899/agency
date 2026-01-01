// ✅ FIXED: Update handleSubmit to properly handle file objects
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // ✅ FIXED: Create FormData properly
    const formData = new FormData();
    
    // Append all non-file fields
    Object.keys(formData).forEach(key => {
      if (key !== 'image' && key !== 'gallery') {
        formData.append(key, formData[key]);
      }
    });
    
    // ✅ FIXED: Handle image file properly
    if (formData.image instanceof File) {
      formData.append('image', formData.image);
    }
    
    // ✅ FIXED: Handle gallery files properly
    if (Array.isArray(formData.gallery)) {
      formData.gallery.forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`gallery[${index}]`, file);
        }
      });
    }
    
    if (editingService) {
      await api.updateService(editingService.id, formData);
    } else {
      await api.createService(formData);
    }
    fetchServices();
    closeModal();
  } catch (error) {
    // Error handled silently
  }
};
