import './edit.css';
import SingleItem from './singleItem';
import MultiItems from './multiItems';
import EditButton from './editButton';

export default function Edit() {
  return (
    <form>
      <SingleItem/>
      <MultiItems/>
      <EditButton/>
    </form>
  )
}
