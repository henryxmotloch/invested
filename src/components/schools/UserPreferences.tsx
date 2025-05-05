
interface UserPreferencesProps {
  userField: string;
  userLocation: string;
  userBudget: string;
  userDuration: string;
}

const UserPreferences = ({ userField, userLocation, userBudget, userDuration }: UserPreferencesProps) => {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="mt-4 text-sm text-white/70">
        <p className="mb-2">Showing results based on:</p>
        <ul className="list-disc list-inside">
          <li>Field of Study: {userField}</li>
          <li>Location: {userLocation}</li>
          <li>Budget: {userBudget}</li>
          <li>Duration: {userDuration}</li>
        </ul>
      </div>
    </div>
  );
};

export default UserPreferences;
