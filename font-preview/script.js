const localFonts = {
    name: 'loacl-fonts',
    allow: true
  };
  
  navigator.permissions.query(localFonts)
    .then(permissionStatus => {
      console.log('Permission status:', permissionStatus.status);
    })
    .catch(error => {
      console.error('Error getting permission status:', error);
    });
  