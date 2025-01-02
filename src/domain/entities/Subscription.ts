export interface Subscription {
    subscriptionId : string
    customerId : string
    metadata : Record<string, string>;
    status : 'incomplete' | 'incomplete_expired' |'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused'
    amount : number
}