const styles = {
    container: {
      flex: 1,
      backgroundColor: '#F6F6F6',
      resizeMode: 'cover',
      //justifyContent: 'center',
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#DDDDDD',
      borderTOPColor: 'gray',
      borderTopWidth: 1,
    },
    filterButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 4,
      borderRadius: 20,
      backgroundColor: '#EEEEEE',
      justifyContent: 'center',
      marginRight: 2,
      elevation: 5,
  
  
    },
    activeFilterButton: {
      backgroundColor: '#007AFF',
    },
    filterButtonText: {
  
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#777777',
  
  
    },
    activeFilterButtonText: {
      color: '#FFFFFF',
    },
    videoContainer: {
      
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 0,
     
  
    },
    card: {
      width: '100%',
      aspectRatio: 16 / 9,
      marginBottom: 60,
    
    },
    imageContainer:{
        flex: 1,
    },
    image: {
     
      width: '100%',
      height: 200,
   
      resizeMode: 'cover',
    },
    overlay: {
      position: 'absolute',
      bottom: -60,
      left: 0,
      right: 0,
      padding: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',

    },
    title: {
      color: '#e0e0e0',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    description: {
      color: 'grey',
      fontSize: 12,
    },
  
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      
  
    },
  };

export default styles;