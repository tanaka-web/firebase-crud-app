import firebase, { db } from '../../plugins/firebase';

type Params = {
  id: string;
  username: string;
  email: string;
  age: number;
  desired_job: string;
  desired_reason: string;
  status: string;
};

export const updateUser = async ({
  id,
  username,
  email,
  age,
  desired_job,
  desired_reason,
  status,
}: Params) => {
  await db.collection('users').doc(id).update({
    username,
    email,
    age,
    desired_job,
    desired_reason,
    status,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
