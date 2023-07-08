#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod dmuseminter {
    use payable_mint_pkg::traits::payable_mint::*;
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
    impl PayableMint for DMuseMinter {}

    impl DMuseMinter {
        #[ink(constructor)]
        pub fn new() -> Self {
            let mut instance = Self::default();
            instance._init_with_owner(instance.env().caller());
            instance._mint_to(instance.env().caller(), Id::U8(1)).expect("Can't mint");
            let collection_id = instance.collection_id();
            instance._set_attribute(collection_id.clone(), String::from("name"), String::from("DMuseMinter"));
            instance._set_attribute(collection_id, String::from("symbol"), String::from("DMM"));
            instance
        }
    }
}