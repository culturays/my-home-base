'use client';

// import { respondToInvite } from '@/app/dashboard/actions/respond-invite';
import { InviteProps } from '@/app/types';
import { useTransition } from 'react'; 
//providerIvs( - invites)
export default function ProviderInvites({ invites }: { invites: InviteProps[] }) {
  const [isPending, startTransition] = useTransition();

  const handleResponse = (invitedId: string|number, response: 'accepted' | 'rejected') => {
    // startTransition(() => {
    //   respondToInvite({ invitedId, response });
    // });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-teal-700">Invitations</h2>
      {invites.length === 0 ? (
        <p className="text-sm text-gray-500">You have no new invitations.</p>
      ) : (
        invites.map((invite) => (
          <div key={invite.id} className="border p-4 rounded bg-white shadow">
            <h3 className="text-lg font-semibold text-gray-800">{invite.job.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{invite.job.description}</p>
            <p className="text-xs text-gray-400 mb-4">Invited by: {invite.client.full_name}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleResponse(invite.id, 'accepted')}
                disabled={isPending}
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
              >
                Accept
              </button>
              <button
                onClick={() => handleResponse(invite.id, 'rejected')}
                disabled={isPending}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
