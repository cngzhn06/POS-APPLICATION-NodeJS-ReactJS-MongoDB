import { Modal, Button } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print"
const PrintInvoice = ({ isModalOpen, setIsModalOpen, customer }) => {

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content : () => componentRef.current,
  })

  return (
    <Modal
      title="Fatura Yazdır"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-20 bg-black" ref={componentRef}>
        <div className="px-6 max-w-5xl mx-auto bg-white">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <img src="images/logo.png" alt="" />
            </div>
            <div className="invoice-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura Detayı:</p>
                  <p>{customer?.customerName}</p>
                  <p>{customer?.customerPhoneNumber}</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura</p>
                  <p>Mimar Sinan Mah </p>
                  <p>Yunus Emre Cad. 57/6</p>
                  <p>Pursaklar / Ankara</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura Numarası</p>
                  <p>000{Math.floor(Math.random() * 100)}</p>
                </div>
                <div className="text-md text-slate-500 sm:block hidden">
                  <p className="font-bold text-slate-700">Fatura Tarihi</p>
                  <span>{customer?.createdAt.substring(0, 10)}</span>
                </div>
              </div>
            </div>
            <div className="invoice-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className=" border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Görsel
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Başlık
                    </th>
                    <th
                      colSpan={4}
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:hidden"
                    >
                      Başlık
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Fiyat
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Adet
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-end text-sm font-normal text-slate-700 md:pl-0"
                    >
                      Toplam
                    </th>
                  </tr>
                </thead>
                <tbody>
                {customer?.cartItems.map((data) => (
                    <tr className="border-b border-slate-200" key={data._id}>
                      <td className="py-4 sm:table-cell hidden">
                        <img
                          src={data.img}
                          alt=""
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                          <span className="font-medium">{data.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Birim Fiyatı {data.price}₺
                          </span>
                        </div>
                      </td>
                      <td className="py-4 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-medium">{data.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Birim Fiyatı {data.price}₺
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center sm:table-cell hidden">
                        <span>{(data.price)}₺</span>
                      </td>
                      <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                        <span>{data.quantity}</span>
                      </td>
                      <td className="py-4 text-end">
                        <span>{(data.price * data.quantity).toFixed(2)}₺</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      className="text-right pt-7 sm:table-cell hidden"
                      colSpan={4}
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Ara Toplam
                      </span>
                    </th>
                    <th
                      className="text-left pt-7 sm:hidden"
                      colSpan={4}
                      scope="row"
                    >
                      <p className="font-normal text-slate-700">Ara Toplam</p>
                    </th>
                    <th className="text-right pt-5" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.subTotal}₺
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-2 sm:table-cell hidden"
                      colSpan={4}
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">KDV%20</span>
                    </th>
                    <th
                      className="text-left pt-2 sm:hidden"
                      colSpan={4}
                      scope="row"
                    >
                      <p className="font-normal text-slate-700">KDV%20</p>
                    </th>
                    <th className="text-right pt-2" scope="row">
                      <span className="font-normal text-red-600">
                        +{customer?.tax}₺
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-2 sm:table-cell hidden"
                      colSpan={4}
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Genel Toplam
                      </span>
                    </th>
                    <th
                      className="text-left pt-2 sm:hidden"
                      colSpan={4}
                      scope="row"
                    >
                      <p className="font-normal text-slate-700">Genel Toplam</p>
                    </th>
                    <th className="text-right pt-2" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.totalAmount}₺
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-p border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum, in!Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Explicabo odit recusandae quaerat vitae
                    non adipisci fuga qui rerum expedita modi.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={handlePrint}>
          Yazdır
        </Button>
      </div>
    </Modal>
  );
};

export default PrintInvoice;
