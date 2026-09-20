export const triggerDeploy = async () => {
  const hookUrl = import.meta.env.VITE_VERCEL_DEPLOY_HOOK;
  if (!hookUrl) return;

  try {
    await fetch(hookUrl, { method: 'POST' });
    console.log('Deploy triggered successfully');
  } catch (error) {
    console.error('Error triggering deploy:', error);
  }
};
