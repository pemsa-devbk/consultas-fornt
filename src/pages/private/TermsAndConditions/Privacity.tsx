import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { accepTerms } from '../../../redux/states/auth';
import { appInstance } from '../../../services/axios';

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>;
}
export const Privacity = ({setPage}:Props) => {
    const dispatch = useDispatch();


    const acceptTerms = async() => {
        try {
            const { data } = await appInstance.get('user/accept-terms');
            dispatch(accepTerms({}));
        } catch (error) {
            toast.error('Error')
        }
    }
    return (
        <>
            <div className='box__title'>
                <h2>Aviso de privacidad</h2>
            </div>
            <div className='box__content'>
                <p>
                    <b>Protección Electrónica Monterrey SA de CV</b>,en lo sucesivo <b>PEMSA</b> en su carácter de responsable encargado del
                    tratamiento de sus datos personales, manifiesta que, para efectos del presente aviso, su domicilio se encuentra ubicado en la
                    calle 33 Poniente 307, Colonia Chulavista, C.P. 72420; Puebla, Puebla, México.
                </p>
                <p>
                    <b>PEMSA</b> presenta este aviso de privacidad con la finalidad de dar cumplimiento a los artículos 15, 16 y demás relativos de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LA LEY).
                </p>
                <p>
                    <b>PEMSA</b> se compromete a que estos datos serán tratados bajo las más estrictas medidas de seguridad que garanticen su confidencialidad.
                </p>
                <p>
                    Los referidos datos personales se incorporarán a las distintas bases de datos de <b>PEMSA</b>, razón por la cual <b>EL CLIENTE</b> autoriza que <b>PEMSA</b> realice el tratamiento de sus datos personales de conformidad con las finalidades más adelante descritas, para utilizarlos durante el desarrollo de las operaciones y servicios contratados. <b>PEMSA</b> tendrá la responsabilidad de protegerlos mientras estén en su poder.
                </p>
                <p>
                    <b>1. Datos Personales Recibidos del Cliente</b><br /><br />
                    <b>EL CLIENTE</b> acepta de manera expresa entregar a <b>PEMSA</b> para su tratamiento, de manera enunciativa más no limitativa los siguientes datos personales: <br /><br />
                    a) Datos generales del titular y/o personal autorizado: Apellido Paterno, Apellido Materno, Nombre(s), identificación oficial, correo electrónico, empresa donde labora y compañía que representa. <br />
                    b) Domicilio: Calle, número exterior, número interior, colonia, código postal, Estado, delegación/municipio, teléfono, correo electrónico.<br /> <br />
                    <b>Datos Personales Sensibles.</b> - Para cumplir con las finalidades previstas en este Aviso de Privacidad, <b>PEMSA</b> hace de su conocimiento que no se tratarán datos personales sensibles:
                    <br />En caso contrario se le darán los avisos respectivos para recabar debidamente su consentimiento expreso.
                    <br /><br />Estos datos serán tratados bajo las más estrictas medidas de seguridad que garanticen su confidencialidad.
                    <br /><br />Podrán tratarse otros datos personales, sensibles y no sensibles, que no se incluyan en las listas anteriores siempre y cuando dichos datos se consideren de la misma naturaleza y no sean excesivos respecto a las finalidades para los cuales se recaban.
                </p>
                <p>
                    <b>2. Finalidad de los Datos Personales</b>
                    <br /><br /><b>El CLIENTE</b> consiente que sus datos personales sean utilizados por <b>PEMSA</b> con la <b>finalidad principal</b> de:
                    <br />
                    <br />1.Identificación, localización y contacto con el titular y encargados;
                    <br />2.Verificar y confirmar su identidad;
                    <br />3.Monitoreo de sus sistemas de alarmas;
                    <br />4.Consulta de los eventos recibidos en nuestra central de monitoreo;
                    <br />5.Atención sus solicitudes, quejas, dudas y/o comentarios relacionados con nuestros servicios;
                    <br />6.Las demás finalidades que resulten necesarias para la prestación de los servicios por usted requeridos.
                    <br />
                    <br /><b>Finalidades Secundarias</b>
                    <br />1.Realizar estudios y procesos internos.
                    <br />2.Realizar encuestas de calidad en el servicio y atención a clientes.
                    <br />3.Para fines mercadotécnicos, publicitarios o de prospección comercial.
                    <br />4.Cumplir con los requisitos legales y reglamentarios aplicables.
                    <br />
                    <br />En caso de que no desee que sus datos personales sean tratados para estas finalidades secundarias, usted tiene un plazo máximo de 5 (cinco) días hábiles para comunicar lo anterior a la Dirección de Contacto: <b>datospersonales@pem-sa.com</b> La negativa para el uso de sus datos personales para estas finalidades secundarias, no podrá ser un motivo para que le neguemos los servicios y productos que solicita o contrata con nosotros.
                </p>
                <p>
                    <b>3.Seguridad de los Datos Personales</b>
                    <br /><br /><b>PEMSA</b> implementará las medidas de seguridad técnicas, administrativas y físicas necesarias para procurar la integridad de sus datos personales y evitar su daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.
                    <br /><br />Únicamente el personal autorizado, que ha cumplido y observado los correspondientes requisitos de confidencialidad, podrá participar en el tratamiento de sus datos personales. El personal autorizado tiene prohibido permitir el acceso de personas no autorizadas  y/o utilizar los  datos personales  para fines  distintos  a los  establecidos  en el  presente Aviso de Privacidad.  La obligación de confidencialidad de las personas que participan en el tratamiento de sus datos personales subsiste aún después de terminada la relación con <b>PEMSA</b>.
                </p>
                <p>
                    <b>4.Transferencias</b>
                    <br />
                    <br />Para efectos de este aviso de privacidad en la Aplicación móvil (APP -Versión WEB) no se harán transferencias de sus datos personales a terceros. En caso contrario se pondrán a su disposición los documentos necesarios a fin de recabar su consentimiento expreso.
                    <br />
                    <br />Se podrán transmitir sus datos personales a las autoridades competentes, locales y federales cuando se encuentre dentro de
                    las excepciones señaladas en la Ley y su Reglamento. En el caso de transferencias, tratamiento de sus datos personales
                    sensibles, financieros y bancarios, se requerirá su consentimiento expreso, mediante la firma del aviso de privacidad
                    respectivo.
                    <br />
                    <br /><b>PEMSA</b> podrá transmitir libremente los datos personales de <b>EL CLIENTE</b> a las sociedades controladoras, subsidiarias o filiales, a una sociedad matriz o a cualquier sociedad de <b>PEMSA </b>que opere bajo los mismos procesos y políticas internas.
                </p>
                <p>
                    <b>5.Limitaciones de la Divulgación de Información</b>
                    <br />
                    <br /><b>PEMSA</b> se compromete a no transferir su información personal a terceros adicionales a los mencionados en el numeral anterior sin su consentimiento y en caso de que <b>EL CLIENTE</b> haya consentido que se realicen transferencias, <b>PEMSA</b> hará del conocimiento del <b>CLIENTE</b> a través de medios impresos o electrónicos la finalidad por la que dicha información será transferida a terceros; asimismo <b>PEMSA</b> informará a través de los mismos medios por los que se recabaron los datos personales (domicilio físico y/o dirección de correo electrónico) los cambios que se realicen al aviso de privacidad.
                    <br />
                    <br />De igual forma <b>EL CLIENTE</b> se compromete a dar aviso a <b>PEMS</b>A sobre cualquier cambio respecto a su domicilio físico y/o dirección de correo electrónico, o personas autorizadas a usar la APP - Versión WEB con la finalidad de que <b>PEMSA</b> pueda comunicarse con <b>EL CLIENTE</b> para informar cualquier cambio o modificación respecto de lo contenido en el presente aviso de privacidad.
                    <br />
                    <br /><b>PEMSA</b> no necesitará el consentimiento de <b>EL CLIENTE</b> para transferir a terceras personas su información en los siguientes casos:
                    <br />
                    <br />a)Cuando la transferencia esté prevista en una Ley o Tratado en los que México sea parte.
                    <br />
                    <br />b)Cuando la transferencia sea necesaria para la prevención o el diagnóstico médico, la prestación de asistencia sanitaria, tratamiento médico o la gestión de servicios sanitarios.
                    <br />
                    <br />c)Cuando sea requerida por autoridades competentes de conformidad con las disposiciones legales aplicables.
                </p>
                <p>
                    <b>6.  Medios para ejercer los derechos de acceso, rectificación, cancelación y oposición (ARCO) de los datos personales</b>
                    <br />
                    <br /><b>PEMSA</b> ha designado a un encargado de datos personales, (el “oficial de Privacidad”), por lo tanto, usted podrá limitar el uso o divulgación de sus datos personales mediante comunicación dirigida al Oficial de Privacidad al correo electrónico siguiente: <b>datospersonales@pem-sa.com</b>  (la “Dirección de Contacto”).
                </p>
                <p>
                    Usted tiene derecho de: (i) acceder a sus datos personales en nuestro poder y conocer los detalles del tratamiento de los mismos, (ii) rectificarlos en caso de ser inexactos o incompletos, (iii) cancelarlos cuando considere que no se requieren para alguna de las finalidades señaladas en el presente Aviso de Privacidad, estén siendo utilizados para finalidades no consentidas o haya finalizado la relación contractual o de servicio, o (iv) oponerse al tratamiento de los mismos para fines específicos, según lo diga la ley, (conjuntamente, los “Derechos ARCO”).
                </p>
                <p>
                    Los Derechos ARCO se ejercerán mediante la presentación de la solicitud respectiva, la cual deberá ser solicitada al Oficial de privacidad al correo: <b>datospersonales@pem-sa.com</b>  acompañada de la siguiente información y documentación:
                </p>
                <p>
                    I.Su nombre, domicilio y correo electrónico para poder comunicarle la respuesta a la Solicitud ARCO;
                </p>
                <p>
                    II.Los documentos que acrediten su identidad (copia de IFE, pasaporte o cualquier otra identificación oficial) o en su caso, los documentos que acrediten su representación legal;
                </p>
                <p>
                    III.Una descripción clara y precisa de los datos personales respecto de los cuales busca ejercer alguno de los Derechos ARCO;
                </p>
                <p>
                    IV.Cualquier documento o información que facilite la localización de sus datos personales;
                </p>
                <p>
                    V.En caso de solicitar una rectificación de datos, deberá de indicar también, las modificaciones a realizarse y aportar la documentación que sustente su petición; y
                </p>
                <p>
                    VI.La indicación del lugar donde podremos revisar los originales de la documentación que acompañe.
                </p>
                <p>
                    Su Solicitud ARCO será contestada mediante un correo electrónico por parte del Oficial de Privacidad en un plazo máximo de 20 (veinte) días hábiles contados desde el día en que se haya recibido su Solicitud ARCO. En caso de que la Solicitud ARCO se conteste de manera afirmativa o procedente, tales cambios se harán en un plazo máximo de 15 (quince) días hábiles. Los plazos referidos en este párrafo se podrán prorrogar por una vez por un periodo igual en caso de ser necesario.
                </p>
                <p>
                    Es importante comunicarle que <b>PEMSA</b> podrá negar el acceso (la “Negativa”) para que usted ejerza sus derechos ARCO en los siguientes supuestos:
                </p>
                <p>
                    I.Cuando Usted no sea el titular de los datos personales, o su representante legal no esté debidamente acreditado para ejercer por medio de él, sus Derechos ARCO;
                </p>
                <p>
                    II.Cuando en nuestra base de datos no se encuentren sus datos personales;
                </p>
                <p>
                    III.Cuando se lesionen los derechos de un tercero;
                </p>
                <p>
                    IV.Cuando exista un impedimento legal o la resolución de una autoridad competente, que restrinja sus Derechos ARCO; y
                </p>
                <p>
                    V.Cuando la Rectificación, Cancelación u Oposición haya sido previamente realizada.
                </p>
                <p>
                    En relación con lo anterior, la Negativa podrá ser parcial, en cuyo caso <b>PEMSA</b> efectuará el acceso, rectificación, cancelación u oposición en la parte procedente.
                </p>
                <p>
                    <b>PEMSA</b> siempre le informará el motivo de su decisión y se la comunicará a Usted o en su caso, a su representante legal, en los plazos anteriormente establecidos, por correo electrónico, acompañando, en su caso, las pruebas que resulten pertinentes.
                </p>
                <p>
                    El ejercicio de los Derechos ARCO será gratuito, previa acreditación de su identidad ante el responsable, pero si Usted reitera su solicitud en un periodo menor a doce meses, los costos serán de tres días de la Unidad de Medida y Actualización Vigente, más I.V.A., a menos que existan modificaciones sustanciales al Aviso de Privacidad que motiven nuevas consultas. En todos los casos, la entrega de los datos personales será gratuita, con la excepción de que Usted deberá de cubrir los gastos justificados de envío o el costo de reproducción en copias u otros formatos.
                </p>
                <p>
                    <b>EL CLIENTE</b> podrá revocar el consentimiento que ha otorgado a PEMSA para el tratamiento de los datos personales que no sean indispensables para el cumplimiento de las obligaciones derivadas del vínculo jurídico que les une, a fin de que <b>PEMSA</b> deje de hacer uso de los mismos. Para ello, es necesario que <b>EL CLIENTE</b> presente su petición en los términos antes mencionados.
                </p>
                <p>
                    <b>7.  Mecanismo para revocación del consentimiento.</b>
                    <br />
                    <br />En caso de que Usted decida revocar su consentimiento para que <b>PEMSA</b> deje de llevar a cabo el tratamiento de sus datos personales, o se oponga a la transferencia de los mismos, deberá de enviar una solicitud de revocación de consentimiento a la Dirección de Contacto, y deberá de ser acompañada en el correo electrónico de los documentos que acrediten su identidad (copia de IFE, pasaporte o cualquier otra identificación oficial) o en su caso, los documentos que acrediten su representación legal y la indicación del lugar en el cual se pone a nuestra disposición los documentos originales.
                    <br />
                    <br />Para conocer el procedimiento y requisitos para la revocación del consentimiento, usted podrá ponerse en contacto con nuestro Oficial de Privacidad en el correo electrónico siguiente: <b>datospersonales@pem-sa.com</b>
                    <br />
                    <br />De conformidad con lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (en adelante “Reglamento general de protección de datos” o “GDPR”), <b>PEMSA</b> se compromete a seguir obteniendo su consentimiento expreso para adquirir, procesar y tratar sus datos personales de conformidad con lo establecido en el GDPR.
                    <br />
                    <br />El presente Aviso de Privacidad y sus cambios será publicado en las oficinas de <b>PEMSA</b> y/o en la página electrónica siguiente: <b>www.pem-sa.com</b>
                </p>
            </div>
            <div className='box__actions'>
                {/* <button
                    className='button button-primary button-small'
                    onClick={() => setPage(0)}
                >
                    Terminos y condiciones
                </button> */}
                <button
                    className='button button-primary button-small'
                    onClick={() => acceptTerms()}
                >
                    Aceptar
                </button>

                <button
                    className='button button-primary button-small'
                    onClick={() => setPage(0)}
                >
                    Rechazar
                </button>
            </div>
        </>
    )
}
