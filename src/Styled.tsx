import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topBarContainer: {
    zIndex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundImage: {
    paddingTop: 10,
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    borderRadius: 18,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  progressBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'center',
    height: 3,
    backgroundColor: 'transparent',
  },
  progressBarBackground: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 2,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'white',
  },
  topBar: {
    position: 'absolute',
    left: 15,
    top: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  storyNameText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  headerViewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  flex1: {
    flex: 1,
  },
  imageContainer: {
    zIndex: 0,
    flex: 1,
  },
});
export default styles;
