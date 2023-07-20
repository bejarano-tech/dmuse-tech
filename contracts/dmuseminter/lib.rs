#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod dmuseminter {
    use ink::storage::Mapping;

    use openbrush::{
        contracts::psp34::extensions::{
            enumerable::*,
            mintable::*,
            metadata::*,
        },
        contracts::ownable::*,
        traits::{Storage, String},
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct DMuseMinter {
        #[storage_field]
        psp34: psp34::Data<enumerable::Balances>,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        metadata: metadata::Data,
        base_uris: ink::storage::Mapping<Id, String>,
    }

    impl PSP34 for DMuseMinter {}
    impl Ownable for DMuseMinter {}
    impl PSP34Mintable for DMuseMinter {
        #[ink(message)]
        #[openbrush::modifiers(only_owner)]
        fn mint(
            &mut self,
            account: AccountId,
            id: Id
        ) -> Result<(), PSP34Error> {
            self._mint_to(account, id)
        }
    }
    impl PSP34Enumerable for DMuseMinter {}
    impl PSP34Metadata for DMuseMinter {}

    impl DMuseMinter {
        #[ink(constructor)]
        pub fn new() -> Self {
            let base_uris = Mapping::default();
            let mut instance = Self::default();
            instance._init_with_owner(instance.env().caller());
            let collection_id = instance.collection_id();
            instance._set_attribute(collection_id.clone(), String::from("name"), String::from("DMuseMinter"));
            instance._set_attribute(collection_id, String::from("symbol"), String::from("DMM"));
            Self { base_uris, metadata: instance.metadata, ownable: instance.ownable, psp34: instance.psp34 }
        }

        #[ink(message)]
        pub fn mint(&mut self, account: AccountId, id: Id, base_uri: String) -> Result<(), PSP34Error> {
            // if Self::env().transferred_value() != 1_000 {
            //     return Err(PSP34Error::Custom(String::from("BadMintValue")));
            // }
            self.base_uris.insert(&id, &base_uri);
            self._mint_to(account, id)
        }

        #[ink(message)]
        pub fn token_uri(&self, id: Id) -> Result<String, PSP34Error> {
            let token_uri = self.base_uris.get(id).unwrap_or_default();
            Ok(token_uri)
        }
    }
}