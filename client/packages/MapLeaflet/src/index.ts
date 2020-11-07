import native from './MapLeaflet.native'
import web from './MapLeaflet.web'

import { Platform } from 'react-native'

export default Platform.OS === 'web' ? web : native
