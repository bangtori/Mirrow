'use server';

import { createClient } from '@/lib/supabase/server';
import { EventName } from '@/types/events';
import type { Json } from '@/types/supabase';

export async function trackEvent(
  eventName: EventName,
  testId?: string,
  metadata?: Json,
) {
  try {
    const supabase = await createClient();

    await supabase.from('events').insert({
      event_name: eventName,
      test_id: testId,
      metadata,
    });
  } catch (error) {
    console.error('[EVENT_TRACK_ERROR]', error);
  }
}
