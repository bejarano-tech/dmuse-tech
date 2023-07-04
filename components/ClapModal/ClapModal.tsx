import Image from 'next/image'
interface ModalProperties {
  isOpen: boolean
  onClose: () => {}
}

const ClapModal = ({ isOpen, onClose }: ModalProperties) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-6 bg-white w-full max-w-md m-auto flex-col flex">
        <span
          className="absolute top-0 right-0 p-4 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <div className="px-5 py-4 text-black">
          <h2 className="text-2xl font-bold mb-4">Send Claps</h2>
          <Image
            className="mb-4 mx-auto"
            src="https://via.placeholder.com/150"
            alt="Placeholder"
            width={150}
            height={150}
          />
          <p className="mb-4">Send Claps to this song`s Artist.</p>
          <input
            className="border rounded w-full py-2 px-3 text-grey-darker mb-4"
            type="text"
            name="name"
            placeholder="Enter the amount of claps to send"
          />
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Send Claps
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClapModal
