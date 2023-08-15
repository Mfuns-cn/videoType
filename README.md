# VideoType

Get video size, duration and type from url or File

need fetch api support

## Usage

```ts
import { getVideoType， getVideoDuration， getVideoSize } from 'videotype'

const type = await getVideoType('https://media.w3.org/2010/05/sintel/trailer.mp4')
const duraction = await getVideoDuration('https://media.w3.org/2010/05/sintel/trailer.mp4')
const size = await getVideoSize('https://media.w3.org/2010/05/sintel/trailer.mp4')

```
