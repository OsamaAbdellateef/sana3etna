import React from 'react';
import './craft-preview.style.scss';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { set_state } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import CraftCard from '../craft-card/craft-card.component';

const firestore = firebase.firestore();


class CraftPreview extends React.Component {



    componentDidMount() {
        this.handle();
    }


    handle = async () => {
        // const events = await firebase.firestore().collection('events')
        // events.get().then((querySnapshot) => {
        //     const tempDoc = []
        //     querySnapshot.forEach((doc) => {
        //        tempDoc.push({ id: doc.id, ...doc.data() })
        //     })
        //     console.log(tempDoc)
        //  })
        var usersRef = await firestore.collection("users").get();
        var users = usersRef.docs.map(doc => doc.data());
        var workers = users.filter(user => user.signedAs == "worker");
        this.props.set_state("workers", workers)
        console.log(workers);
        
    }
    render() {
        return (
            <div className="craft-preview" >

                {this.props.workers.map(worker => (
                    <CraftCard imageCraftURL={worker.imageCraftURL} dispalyName={worker.dispalyName} address={worker.address} phoneNumber={worker.phoneNumber} imagePersonalURL={worker.imagePersonalURL} />
                ))}
            </div >
        )
    }

}

const mapStateToProps = ({ user }) => ({
    workers: user.workers
})

const mapDispatchToProps = (dispatch) => ({
    set_state: (stateName, value) => dispatch(set_state(stateName, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(CraftPreview);