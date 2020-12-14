import firebase, { db } from '../../plugins/firebase';

type Params = {
  username: string;
  email: string;
  age: number;
  desired_job: string;
  desired_reason: string;
};

export const createUser = async ({ username, email, age, desired_job, desired_reason }: Params) => {
  const docId = db.collection('users').doc().id;

  await db.collection('users').doc(docId).set({
    docId: docId,
    username,
    email,
    age,
    desired_job,
    desired_reason,
    status: '受付',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
