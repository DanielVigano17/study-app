import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { modules } from '@/domain';

export async function checkFeatureLimits(
  request: Request,
  featureKey: string,
  userId: string,
  subscriptionId: string
) {
  try {

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const subscription = await modules.useCase.billing.findSubscription.execute(subscriptionId);
    const product = await modules.useCase.billing.retriveProduct.execute(subscription?.metadata.productId);
    const usage = await modules.useCase.user.calculateFeatureUsage.execute(userId);

    if (!product?.metadata?.features) {
      return new NextResponse('No feature limits defined', { status: 400 });
    }

    const features = JSON.parse(product.metadata.features);
    const feature = features.find((f: any) => f.lookup_key === featureKey);
    
    if (!feature) {
      return new NextResponse('Feature not found', { status: 400 });
    }

    const currentUsage = usage[featureKey] || 0;
    const limit = parseInt(feature.value);

    if (currentUsage >= limit) {
      return new NextResponse('Feature limit reached', { 
        status: 403,
        headers: {
          'Content-Type': 'application/json'
        },
        statusText: JSON.stringify({
          error: 'FEATURE_LIMIT_REACHED',
          message: `Você atingiu o limite de ${feature.name}. Faça upgrade do seu plano para continuar.`,
          feature: feature.name,
          current: currentUsage,
          limit: limit
        })
      });
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error checking feature limits:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 