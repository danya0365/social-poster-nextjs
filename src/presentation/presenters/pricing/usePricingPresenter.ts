'use client';

import { PricingFAQ, PricingPlan } from '@/src/application/repositories/IPricingRepository';
import { useEffect, useMemo, useState } from 'react';
import { PricingPresenter, PricingViewModel } from './PricingPresenter';
import { createClientPricingPresenter } from './PricingPresenterClientFactory';

export interface PricingState {
  plans: PricingPlan[];
  faqs: PricingFAQ[];
  loading: boolean;
  error: string | null;
  selectedPlanId: string;
}

export interface PricingActions {
  selectPlan: (id: string) => void;
  refreshPricing: () => Promise<void>;
}

export function usePricingPresenter(
  initialViewModel?: PricingViewModel,
  presenterOverride?: PricingPresenter
): [PricingState, PricingActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientPricingPresenter(),
    [presenterOverride]
  );

  const [plans, setPlans] = useState<PricingPlan[]>(initialViewModel?.plans ?? []);
  const [faqs, setFaqs] = useState<PricingFAQ[]>(initialViewModel?.faqs ?? []);
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('monthly');

  const refreshPricing = async () => {
    setLoading(true);
    try {
      const data = await presenter.getViewModel();
      setPlans(data.plans);
      setFaqs(data.faqs);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch pricing data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialViewModel) {
      refreshPricing();
    }
  }, []);

  const actions: PricingActions = {
    selectPlan: (id: string) => setSelectedPlanId(id),
    refreshPricing,
  };

  return [
    { plans, faqs, loading, error, selectedPlanId },
    actions
  ];
}
